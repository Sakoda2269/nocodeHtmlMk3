import clientPromise from "@/lib/mongodb";

export async function GET(request) {
    try{
        const client = await clientPromise;
        const db = client.db("nocode");
        const collection = db.collection("projects");
        const res = await collection.find({}, {projection: {_id: 1, title: 1}}).toArray();
        return new Response(JSON.stringify(res), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message: "error"}), {status: 500});
    }
}

export async function POST(request) {
    try{
        const client = await clientPromise;
        const db = client.db("nocode");
        const collection = db.collection("projects");
        console.log(request)
        const data = await request.json();
        const result = await collection.insertOne(data);
        return new Response(JSON.stringify({id: result.insertedId}), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({message: "error"}), {status: 500});
    }
}