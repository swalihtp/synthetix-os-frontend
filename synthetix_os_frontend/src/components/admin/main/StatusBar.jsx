export default function StatusBar() {
  return (
    <footer className="h-8 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between px-gutter">
      <div className="flex items-center gap-stack-lg">
        <span className="text-[9px] font-label-caps text-primary">IO_STATUS: OK</span>
        <span className="text-[9px] font-label-caps text-on-surface-variant">
          SECURE_TUNNEL: ENABLED
        </span>
        <span className="text-[9px] font-label-caps text-on-surface-variant">
          LOCAL_NODES: 14/14
        </span>
      </div>
      <div className="flex items-center gap-unit text-[9px] font-label-caps text-on-surface-variant">
        <span>SYN_OS_V2</span>
        <span className="animate-pulse">_</span>
      </div>
    </footer>
  );
}
