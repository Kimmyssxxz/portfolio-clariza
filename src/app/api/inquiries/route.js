import { NextResponse } from "next/server";
import { metric } from "@vercel/functions";
import {
  listInquiries,
  saveInquiry,
  verifyAdminPin,
} from "@/lib/inquiriesStore";

export async function GET(request) {
  const startedAt = performance.now();
  const pin = request.headers.get("x-admin-pin");

  if (!verifyAdminPin(pin)) {
    metric("inquiries.listed", 1, { outcome: "unauthorized" });
    return NextResponse.json(
      { error: "Invalid passcode. Access denied." },
      { status: 401 }
    );
  }

  try {
    const inquiries = await listInquiries();
    metric("inquiries.listed", 1, { outcome: "success" });
    return NextResponse.json({ inquiries }, { status: 200 });
  } catch (error) {
    metric("inquiries.listed", 1, { outcome: "error" });
    console.error("Failed to list inquiries:", error);
    return NextResponse.json(
      { error: "Could not load inquiries right now." },
      { status: 500 }
    );
  } finally {
    metric("inquiries.list_duration_ms", performance.now() - startedAt);
  }
}

export async function POST(request) {
  const startedAt = performance.now();

  try {
    const body = await request.json();
    const { name, email, serviceNeeded, message } = body || {};

    if (!name || !email || !message) {
      metric("inquiries.submitted", 1, { outcome: "validation_error" });
      return NextResponse.json(
        { error: "Please fill in your name, email, and message." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(String(email).trim())) {
      metric("inquiries.submitted", 1, { outcome: "validation_error" });
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const saved = await saveInquiry({ name, email, serviceNeeded, message });
    metric("inquiries.submitted", 1, { outcome: "success" });

    return NextResponse.json(
      { ok: true, inquiry: saved },
      { status: 201 }
    );
  } catch (error) {
    metric("inquiries.submitted", 1, { outcome: "error" });
    console.error("Failed to save inquiry:", error);
    return NextResponse.json(
      { error: "Unable to send inquiry right now. Please try again." },
      { status: 500 }
    );
  } finally {
    metric("inquiries.submit_duration_ms", performance.now() - startedAt);
  }
}
