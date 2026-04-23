import type { Request, Response, NextFunction } from "express";

export function requireApiKey(req: Request, res: Response, next: NextFunction): void {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    res.status(500).json({ error: "Server misconfigured: API_KEY not set" });
    return;
  }

  // Accept key via Authorization header (REST) or ?token= query param (EventSource/SSE)
  const authHeader = req.headers["authorization"];
  const headerKey = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : null;
  const queryKey = typeof req.query.token === "string" ? req.query.token : null;
  const provided = headerKey ?? queryKey;

  if (!provided || provided !== apiKey) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  next();
}
