"use client";

import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

export default function ScannerWindow(): JSX.Element {
  const [upc, setUpc] = useState("DEFAULT");

  const queryUpc = (newUpc) => {
    setUpc(newUpc);
    // actually query lol
  };

  return (
    <div>
      <h3>Scan product barcode below:</h3>
      <div
        style={{
          width: "40%",
        }}
      >
        <Scanner
          onResult={queryUpc}
          onError={(error: any) => console.log(`ERROR: ${error}`)}
          components={{
            tracker: false,
            onOff: false,
          }}
        />
      </div>
      <p>UPC IS: {upc}</p>
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
