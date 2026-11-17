"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { contact } from "@/content";

export default function CopyBtn() {
  const [ok, setOk] = useState(false);
  const [can, setCan] = useState(false);

  useEffect(() => setCan(!!navigator.clipboard), []);

  useEffect(() => {
    if (!ok) return;
    const t = setTimeout(() => setOk(false), 1800);
    return () => clearTimeout(t);
  }, [ok]);

  const go = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setOk(true);
    } catch {
      setCan(false);
    }
  };

  return (
    <button type="button" onClick={go} disabled={!can} className={ok ? "btn btn-red" : "btn"} aria-live="polite">
      {ok ? <Check size={14} /> : <Copy size={14} />}
      {ok ? contact.copied : contact.copy}
    </button>
  );
}
