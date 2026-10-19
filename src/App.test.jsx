import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

async function addNote(user, title, desc) {
  await user.type(screen.getByLabelText("Note title"), title);
  await user.type(screen.getByLabelText("Note description"), desc);
  await user.click(screen.getByRole("button", { name: "Add Note" }));
}

describe("Note app", () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
  });

  it("shows the empty state", () => {
    render(<App />);
    expect(screen.getByText(/No Notes has already been added/)).toBeTruthy();
  });

  it("adds a note and updates counters", async () => {
    const user = userEvent.setup();
    render(<App />);
    await addNote(user, "Buy milk", "2 litres");
    expect(screen.getByText("Buy milk")).toBeTruthy();
    expect(screen.getByText(/My Notes\(1\)/)).toBeTruthy();
  });

  it("ignores empty or whitespace-only notes", async () => {
    const user = userEvent.setup();
    render(<App />);
    await addNote(user, "   ", "   ");
    expect(screen.getByText(/My Notes\(0\)/)).toBeTruthy();
  });

  it("toggles completed state", async () => {
    const user = userEvent.setup();
    render(<App />);
    await addNote(user, "Task", "desc");
    const box = screen.getByLabelText("Mark Task as completed");
    expect(box.checked).toBe(false);
    await user.click(box);
    expect(box.checked).toBe(true);
    expect(box.closest(".note-item").className).toContain("completed");
  });

  it("deletes a note", async () => {
    const user = userEvent.setup();
    render(<App />);
    await addNote(user, "Temp", "gone soon");
    await user.click(screen.getByLabelText("Delete note Temp"));
    await waitFor(() => expect(screen.queryByText("Temp")).toBeNull(), {
      timeout: 1500,
    });
  });

  it("persists notes across a restart", async () => {
    const user = userEvent.setup();
    const first = render(<App />);
    await addNote(user, "Keep me", "persisted");
    first.unmount();
    render(<App />);
    expect(screen.getByText("Keep me")).toBeTruthy();
  });

  it("survives corrupted storage", () => {
    localStorage.setItem("note-app:notes:v1", "{not json");
    render(<App />);
    expect(screen.getByText(/No Notes has already been added/)).toBeTruthy();
  });
});
