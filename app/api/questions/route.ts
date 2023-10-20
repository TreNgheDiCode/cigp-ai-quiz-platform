import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/next-auth";
import { getQuestionsSchema } from "@/schemas/questions";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    // if (!session?.user) {
    //   return NextResponse.json(
    //     { error: "You must be logged in to create a game." },
    //     {
    //       status: 401,
    //     }
    //   );
    // }
    const body = await req.json();
    const { amount, topic, type } = getQuestionsSchema.parse(body);
    let questions: any;
    if (type === "open_ended") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate a pair of question and answers, the length of each answer should not be more than 15 words, store all the pairs of answers and questions in a JSON array, and both question and answers are in Vietnamese",
        new Array(amount).fill(
          `You are to generate a random hard open-ended questions about ${topic}, and in Vietnamese`
        ),
        {
          question: "question",
          answer:
            "answer with max length of 15 words, use Vietnamese to display the answer",
        }
      );
    } else if (type === "mcq") {
      questions = await strict_output(
        "You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not be more than 15 words, store all answers and questions and options in a JSON array, and both question and answers are in Vietnamese",
        new Array(amount).fill(
          `You are to generate a random hard mcq question about ${topic}, and is in Vietnamese`
        ),
        {
          question: "question",
          answer:
            "answer with max length of 15 words, use Vietnamese to display the answer",
          option1:
            "option1 with max length of 15 words, use Vietnamese to display the option",
          option2:
            "option2 with max length of 15 words, use Vietnamese to display the option",
          option3:
            "option3 with max length of 15 words, use Vietnamese to display the option",
        }
      );
    }
    return NextResponse.json(
      {
        questions: questions,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    } else {
      return NextResponse.json(
        { error: "Lỗi xảy ra." },
        {
          status: 500,
        }
      );
    }
  }
}
