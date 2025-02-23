import { NextResponse } from "next/server";
import { ZodError } from "zod";


export const handleError = (error: ZodError) => {
    const errors = error.issues.map(issue => ({
        field: issue.path[0],
        message: issue.message
      }));
    
      return NextResponse.json({ errors }, { status: 400 });
}