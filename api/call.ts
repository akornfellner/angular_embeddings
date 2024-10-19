async function call(text1: string, text2: string) {
    const response = await fetch("http://localhost:5000/similarity", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text1, text2 })
    });

    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.similarity;
}

async function get_similarity(text1: string, text2: string) {
    try {
        const similarity = await call(text1, text2);
        console.log(similarity);
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}

const a = "I am a student.";
const b = "I am a teacher.";

get_similarity(a, b);
