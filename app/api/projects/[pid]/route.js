import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, {params}) {
    try{
        const client = await clientPromise;
        const {pid} = params;
        const db = client.db("nocode");
        const collection = db.collection("projects");
        const res = await collection.findOne({ _id: new ObjectId(pid) });
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