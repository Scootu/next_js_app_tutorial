import { MongoClient } from "mongodb";
export default async function handler(req, res) {
  if (req.method == "POST") {
    const data = req.body;
    const { title, image, address, description } = data;
    const uri = "mongodb+srv://anes1234:EPJjrR3Op6Y6ipVg@cluster0.9pzjkap.mongodb.net/?retryWrites=true&w=majority";
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri);

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetups inserted !" });
  }
}
