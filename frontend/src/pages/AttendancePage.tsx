import { useEffect, useRef, useState, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PageHeader } from "@/components/PageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Search, UserCheck, CheckCircle, X, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { qrMembers } from "@/data/mockData";

export default function AttendancePage() {
  const [scanning, setScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [checkedIn, setCheckedIn] = useState<{ name: string; time: string }[]>([]);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = "qr-reader";

  const handleScanSuccess = useCallback((decodedText: string) => {
    // Stop scanner
    if (scannerRef.current?.isScanning) {
      scannerRef.current.stop().catch(() => {});
    }
    setScanning(false);

    // Find member
    const member = qrMembers.find((m) => m.id === decodedText);
    const name = member ? member.name : decodedText;
    setScannedResult(name);

    // Add to recent check-ins
    setCheckedIn((prev) => [
      { name, time: "Just now" },
      ...prev.map((c, i) => ({
        ...c,
        time: `${(i + 1) * 2} mins ago`,
      })),
    ]);

    // Clear success after 3s
    setTimeout(() => setScannedResult(null), 3000);
  }, []);

  const startScanner = useCallback(async () => {
    setScanning(true);
    // Small delay so DOM element renders
    await new Promise((r) => setTimeout(r, 300));

    try {
      const scanner = new Html5Qrcode(scannerContainerId);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "user" },
        { 
          fps: 10, 
          qrbox: { width: 250, height: 250 },
          videoConstraints: {
            facingMode: "user",
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        },
        (decodedText) => handleScanSuccess(decodedText),
        () => {} // ignore errors during scanning
      );
    } catch (err) {
      console.error("Camera error:", err);
      setScanning(false);
    }
  }, [handleScanSuccess]);

  const stopScanner = useCallback(() => {
    if (scannerRef.current?.isScanning) {
      scannerRef.current.stop().catch(() => {});
    }
    setScanning(false);
  }, []);

  useEffect(() => {
    // Inject CSS to prevent video mirroring
    const style = document.createElement('style');
    style.textContent = `
      #${scannerContainerId} video,
      #${scannerContainerId} video::-webkit-media-controls,
      #${scannerContainerId} video::-moz-media-controls,
      video {
        transform: none !important;
        -webkit-transform: none !important;
        -moz-transform: none !important;
        -ms-transform: none !important;
        -o-transform: none !important;
        scaleX: 1 !important;
        scaleY: 1 !important;
        scaleZ: 1 !important;
        rotate: 0deg !important;
        -webkit-transform: scaleX(1) scaleY(1) !important;
        -moz-transform: scaleX(1) scaleY(1) !important;
        -ms-transform: scaleX(1) scaleY(1) !important;
        -o-transform: scaleX(1) scaleY(1) !important;
        transform: scaleX(1) scaleY(1) !important;
        filter: none !important;
        -webkit-filter: none !important;
        -moz-filter: none !important;
        -ms-filter: none !important;
        -o-filter: none !important;
      }
      #${scannerContainerId} {
        transform: none !important;
        -webkit-transform: none !important;
        -moz-transform: none !important;
        -ms-transform: none !important;
        -o-transform: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {});
      }
      // Clean up the style
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <DashboardLayout>
      <PageHeader title="ATTENDANCE" subtitle="Scan QR codes or manual check-in" />

      {/* Success Toast */}
      <AnimatePresence>
        {scannedResult && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed left-1/2 top-6 z-[100] flex -translate-x-1/2 items-center gap-3 rounded-lg border border-status-present/30 bg-status-present/10 px-6 py-4 shadow-2xl backdrop-blur-md"
          >
            <CheckCircle size={24} className="text-status-present" />
            <div>
              <p className="font-display text-sm uppercase tracking-wider text-foreground">Check-in Successful</p>
              <p className="text-sm text-muted-foreground">{scannedResult}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Scanner */}
        <div className="card-glow rounded-xl border border-border bg-card p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]">
          <h3 className="mb-4 font-display text-sm uppercase tracking-wider text-muted-foreground">QR Scanner</h3>

          <div className="relative aspect-square overflow-hidden rounded-lg bg-background">
            {scanning ? (
              <div id={scannerContainerId} className="h-full w-full [&_video]:rounded-lg [&_video]:transform-none [&_video]:scale-x-100" style={{ transform: 'none' }} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4">
                <Camera size={48} className="text-muted-foreground/30" />
                <p className="text-sm text-muted-foreground">Camera is off</p>
              </div>
            )}

            {/* Corner markers */}
            {!scanning &&
              ["top-0 left-0", "top-0 right-0 rotate-90", "bottom-0 right-0 rotate-180", "bottom-0 left-0 -rotate-90"].map((pos, i) => (
                <div key={i} className={`absolute ${pos}`}>
                  <div className="h-8 w-8">
                    <div className="absolute left-0 top-0 h-2 w-8 rounded-tl bg-primary" />
                    <div className="absolute left-0 top-0 h-8 w-2 rounded-tl bg-primary" />
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-4 flex gap-2">
            {!scanning ? (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={startScanner}
                className="flex flex-1 items-center justify-center gap-2 rounded-md bg-primary py-3 font-display text-sm uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Camera size={16} /> Start Scanner
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={stopScanner}
                className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-secondary py-3 font-display text-sm uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-muted"
              >
                <X size={16} /> Stop Scanner
              </motion.button>
            )}
          </div>

          {/* Manual Entry */}
          <div className="mt-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search member..."
                className="w-full rounded-md border border-border bg-secondary py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                ⌘K
              </kbd>
            </div>
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 font-display text-sm uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <UserCheck size={16} /> Manual Check-in
            </motion.button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Recent Check-ins */}
          <div className="card-glow rounded-xl border border-border bg-card p-6 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]">
            <h3 className="mb-4 font-display text-sm uppercase tracking-wider text-muted-foreground">
              Recent Check-ins
            </h3>
            {checkedIn.length === 0 ? (
              <div className="flex flex-col items-center py-8 text-muted-foreground">
                <UserCheck size={32} className="mb-2 opacity-30" />
                <p className="text-sm">No check-ins yet</p>
                <p className="text-xs">Scan a QR code to get started</p>
              </div>
            ) : (
              <div className="space-y-1">
                {checkedIn.map((c, i) => (
                  <motion.div
                    key={`${c.name}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between rounded-md px-3 py-3 transition-colors hover:bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 font-display text-xs text-primary">
                        {c.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-foreground">{c.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{c.time}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
