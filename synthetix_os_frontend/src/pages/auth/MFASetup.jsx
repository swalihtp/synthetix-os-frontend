import { useEffect, useState } from "react";
import { enableMFA } from "../../api/auth";
import QRCode from "react-qr-code";
import VerifyMFA from "./VerifyMFA";

function MFASetup() {
  const [qr, setQr] = useState(null);

  useEffect(() => {
    enableMFA().then((res) => {
      setQr(res.data.qr_uri);
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Scan this QR Code</h2>

      {qr && <QRCode value={qr} />}
      <VerifyMFA />
    </div>
  );
}

export default MFASetup;