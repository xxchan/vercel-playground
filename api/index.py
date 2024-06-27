from flask import Flask, request
import fastavro
import io
import json
import binascii

app = Flask(__name__)


@app.route("/api/python")
def hello_world():
    return "<p>Hello, World!</p>"


@app.post("/api/avro")
def json_to_avro_binary_hex():
    try:
        data = request.get_data(as_text=True)
        data = json.loads(data)
        schema_str = data["schema"]
        json_data_str = data["data"]
        # removes newlines in the json_data_str
        json_data_str = json_data_str.replace("\n", "")

        schema = json.loads(schema_str)
        with io.StringIO(json_data_str) as buf:
            reader = fastavro.json_reader(buf, schema)
            data = next(reader)

        # Prepare a bytes buffer to write the binary Avro data
        buffer = io.BytesIO()
        # Write the Avro binary data to the buffer
        fastavro.schemaless_writer(buffer, schema, data)
        # Get the binary data from the buffer
        binary_data = buffer.getvalue()
        # Convert the binary data to a hex string
        hex_string = binascii.hexlify(binary_data).decode("utf-8")
        return hex_string
    except Exception as e:
        return str(e), 500
