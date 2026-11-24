import { put, list, get, del } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const BLOB_PREFIX = "inquiries/";
const LOCAL_DATA_FILE = path.join(process.cwd(), ".data", "inquiries.json");
const VALID_STATUSES = ["New", "Reviewed", "Replied"];

function hasBlobStorage() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export function getAdminPin() {
  return process.env.INQUIRIES_ADMIN_PIN || "clariza2026";
}

export function verifyAdminPin(pin) {
  if (!pin || typeof pin !== "string") return false;
  return pin.trim() === getAdminPin();
}

async function readLocalInquiries() {
  try {
    const raw = await fs.readFile(LOCAL_DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLocalInquiries(items) {
  await fs.mkdir(path.dirname(LOCAL_DATA_FILE), { recursive: true });
  await fs.writeFile(LOCAL_DATA_FILE, JSON.stringify(items, null, 2), "utf8");
}

function blobPathForId(id) {
  return `${BLOB_PREFIX}${id}.json`;
}

export async function saveInquiry({ name, email, serviceNeeded, message }) {
  const id = `${Date.now()}-${crypto.randomBytes(4).toString("hex")}`;
  const inquiry = {
    id,
    name: String(name).trim().slice(0, 150),
    email: String(email).trim().slice(0, 200),
    serviceNeeded: String(serviceNeeded || "General Admin VA").trim().slice(0, 120),
    message: String(message).trim().slice(0, 2000),
    status: "New",
    createdAt: new Date().toISOString(),
  };

  if (hasBlobStorage()) {
    await put(blobPathForId(id), JSON.stringify(inquiry), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } else {
    const items = await readLocalInquiries();
    items.unshift(inquiry);
    await writeLocalInquiries(items);
  }

  return inquiry;
}

export async function listInquiries() {
  if (hasBlobStorage()) {
    const { blobs } = await list({ prefix: BLOB_PREFIX, limit: 200 });
    const records = await Promise.all(
      blobs.map(async (blob) => {
        try {
          const result = await get(blob.pathname, {
            access: "private",
            useCache: false,
          });
          if (!result || result.statusCode !== 200 || !result.stream) return null;
          const data = await new Response(result.stream).json();
          return data;
        } catch {
          return null;
        }
      })
    );

    return records
      .filter(Boolean)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  const items = await readLocalInquiries();
  return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function updateInquiryStatus(id, status) {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error("Invalid status value");
  }

  const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, "");
  if (!safeId) return null;

  if (hasBlobStorage()) {
    const pathname = blobPathForId(safeId);
    const result = await get(pathname, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;

    const existing = await new Response(result.stream).json();
    const updated = { ...existing, status, updatedAt: new Date().toISOString() };

    await put(pathname, JSON.stringify(updated), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });

    return updated;
  }

  const items = await readLocalInquiries();
  const idx = items.findIndex((item) => item.id === safeId);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], status, updatedAt: new Date().toISOString() };
  await writeLocalInquiries(items);
  return items[idx];
}

export async function deleteInquiry(id) {
  const safeId = String(id).replace(/[^a-zA-Z0-9_-]/g, "");
  if (!safeId) return false;

  if (hasBlobStorage()) {
    await del(blobPathForId(safeId));
    return true;
  }

  const items = await readLocalInquiries();
  const filtered = items.filter((item) => item.id !== safeId);
  await writeLocalInquiries(filtered);
  return true;
}
