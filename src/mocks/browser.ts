import { setupWorker } from "msw/browser";
import { db } from "./db";

export const worker = setupWorker(...db.user.toHandlers("rest"));
