'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';


export default function Home() {
    const [avro_schema, setavro_schema] = useState('{"type":"record","name":"OBJ_ATTRIBUTE_VALUE","namespace":"CPLM","fields":[{"name":"op_type","type":["null","string"],"default":null},{"name":"ID","type":["null","string"],"default":null},{"name":"CLASS_ID","type":["null","string"],"default":null},{"name":"ITEM_ID","type":["null","string"],"default":null},{"name":"ATTR_ID","type":["null","string"],"default":null},{"name":"ATTR_VALUE","type":["null","string"],"default":null},{"name":"ORG_ID","type":["null","string"],"default":null},{"name":"UNIT_INFO","type":["null","string"],"default":null},{"name":"UPD_TIME","type":["null","string"],"default":null},{"name":"DEC_VAL","type":[{"type":"bytes","logicalType":"decimal","precision":10,"scale":2},"null"],"default":"\\u00ff"},{"name":"REFERRED","type":["null",{"type":"record","name":"REFERRED_TYPE","fields":[{"name":"a","type":"string"}]}],"default":null},{"name":"REF","type":["null","REFERRED_TYPE"],"default":null},{"name":"uuid","type":["null",{"type":"string","logicalType":"uuid"}],"default":null},{"name":"rate","type":"double","default":"NaN"}],"connect.name":"CPLM.OBJ_ATTRIBUTE_VALUE"}');
    const [avro_data, setavro_data] = useState('{"op_type": {"string": "update"}, "ID": {"string": "id1"}, "CLASS_ID": {"string": "1"}, "ITEM_ID": {"string": "6768"}, "ATTR_ID": {"string": "6970"}, "ATTR_VALUE": {"string": "value9"}, "ORG_ID": {"string": "7172"}, "UNIT_INFO": {"string": "info9"}, "UPD_TIME": {"string": "2021-05-18T07:59:58.714Z"}, "DEC_VAL": {"bytes": "\\u0002\\u0054\\u000b\\u00e3\\u00ff"}}');
    const [responseData, setResponseData] = useState('');


    const handleButtonClick = () => {
        const payload = {
            schema: avro_schema,
            data: avro_data
        };

        fetch('/api/avro', {
            method: 'POST',
            body: JSON.stringify(payload)
        })
            .then((response) => response.text())
            .then((data) => {
                // Handle the response from the server
                console.log(data);
                setResponseData(data);
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };

    return (
        <div>
            <div>
                <p>Avro Schema:</p>
                <textarea id="avro_schema" value={avro_schema} onChange={(event) => {
                    setavro_schema(event.target.value);
                }} style={{ height: "200px", width: "1000px" }} />
            </div>

            <div>
                <p>Avro Data:</p>
                <textarea id="avro_data" value={avro_data} onChange={(event) => {
                    setavro_data(event.target.value);
                }} style={{ height: "200px", width: "1000px" }} />
            </div>

            <div>
                <button onClick={handleButtonClick}>Convert Avro data to binary encoding</button>
            </div>

            <div>
                <p>Response:</p>
                <pre>{responseData}</pre>
            </div>
        </div>
    );
}
