"use client";

import { Scanner } from "@yudiel/react-qr-scanner";

interface Props {
  parentUpc: string;
  setParentUpc: (parentUpc: string) => void;
}

export default function ScannerWindow({
  parentUpc,
  setParentUpc,
}: Props): JSX.Element {
  return (
    <div
      style={{
        maxWidth: 500,
        minWidth: 200,
        width: "40%",
        display: "flex",
      }}
    >
      <Scanner
        onResult={setParentUpc}
        onError={(error: any) => console.log(`ERROR: ${error}`)}
        components={{
          tracker: false,
          onOff: false,
        }}
      />
    </div>
  );
}

// import BarcodeScannerComponent from "react-qr-barcode-scanner";
// import { useState } from "react";

// export default function Scanner(): JSX.Element {
//   const [upc, setUpc] = useState("DEFAULT");

//   return (
//     <div>
//       <h1>HELLO SCAN PAGE</h1>
//       <BarcodeScannerComponent
//         width={500}
//         height={500}
//         onUpdate={(err, result) => {
//           if (result) {
//             setUpc(result.text);
//           } else {
//             setUpc("Not Found");
//           }
//         }}
//       />
//       <p>UPC IS: {upc}</p>
//     </div>
//   );
// }
