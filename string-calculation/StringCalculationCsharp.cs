using System;
using System.Text.RegularExpressions;

namespace StringCalculationCsharpImplementation
{
    public static class StringCalculationCsharp
    {
        public static int Answer(string prompt)
        {

            Match tokens = Regex.Match(prompt.ToLower(), @"((?<=what +is +)(?'operand'-{0,1}\d+)(?=\?*$))|(?<=what +is +)(?'operand'-{0,1}\d+)( +(?'operation'plus|minus|multiplied +by|divided +by) +(?'operand'-{0,1}\d+))+ *(?=\?)");
            
            CaptureCollection operandCaptures = tokens.Groups["operand"].Captures;
            CaptureCollection operationCaptures = tokens.Groups["operation"].Captures;

            // operationCount must be (operationCount - 1) to be valid prompt
            if (operationCaptures.Count != operandCaptures.Count - 1)
            {
                throw new ArgumentException("Unsupported prompt: The prompt did not contain anything that can be calculated or not a valid operation/operand combination");
            }


            // handle single number w/o operation 
            if (operandCaptures.Count == 1) 
            {
                return int.Parse(operandCaptures[0].Value);
            }

            int result = 0;
            for (int i = 0; i < operandCaptures.Count; i++)
            {

                if (i == 0)
                {
                    result = int.Parse(operandCaptures[i].Value);
                }

                if (i == operandCaptures.Count - 1)
                {
                    break;
                }

                result = Calculate(result, operationCaptures[i].Value, int.Parse(operandCaptures[i + 1].Value));

            }

            return result;

        }

        private static int Calculate(int operandA, String operation, int operandB)
        {
            switch (operation)
            {
                case "plus":
                    return operandA + operandB;
                case "minus":
                    return operandA - operandB;
                case "multiplied by":
                    return operandA * operandB;
                case "divided by":
                    return operandA / operandB;
                default:
                    throw new ArgumentException("Operation not supported");
            }
        }


    }
}