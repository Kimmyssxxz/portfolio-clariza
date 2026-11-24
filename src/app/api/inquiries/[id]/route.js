import { NextResponse } from "next/server";
import { metric } from "@vercel/functions";
import {
  updateInquiryStatus,
  deleteInquiry,
  verifyAdminPin,
} from "@/lib/inquiriesStore";

export async function PATCH(request, context) {
  const pin = request.headers.get("x-admin-pin");
  if (!verifyAdminPin(pin)) {
    metric("inquiries.updated", 1, { outcome: "unauthorized" });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const { status } = await request.json();

    const updated = await updateInquiryStatus(id, status);
    if (!updated) {
      metric("inquiries.updated", 1, { outcome: "not_found" });
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    metric("inquiries.updated", 1, { outcome: "success", status });
    return NextResponse.json({ ok: true, inquiry: updated }, { status: 200 });
  } catch (error) {
    metric("inquiries.updated", 1, { outcome: "error" });
    console.error("Failed to update inquiry:", error);
    return NextResponse.json(
      { error: "Failed to update inquiry status." },
      { status: 400 }
    );
  }
}

export async function DELETE(request, context) {
  const pin = request.headers.get("x-admin-pin");
  if (!verifyAdminPin(pin)) {
    metric("inquiries.deleted", 1, { outcome: "unauthorized" });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await deleteInquiry(id);
    metric("inquiries.deleted", 1, { outcome: "success" });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    metric("inquiries.deleted", 1, { outcome: "error" });
    console.error("Failed to delete inquiry:", error);
    return NextResponse.json(
      { error: "Failed to delete inquiry." },
      { status: 500 }
    );
  }
}
