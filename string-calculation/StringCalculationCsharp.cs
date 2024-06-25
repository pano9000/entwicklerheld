using System;
using System.Text.RegularExpressions;

namespace StringCalculationCsharpImplementation
{
    public static class StringCalculationCsharp
    {
        public static int Answer(string prompt)
        {

            //regex matching group
            MatchCollection tokens = Regex.Matches(prompt.ToLower(), @"((?<=what +is +)(?'operand'-{0,1}\d+)(?=\?*$))|(?<=what +is +)(?'operand'-{0,1}\d+)( +(?'operation'plus|minus|multiplied +by|divided +by) +(?'operand'-{0,1}\d+))+ *(?=\?)");

            // tokens should always be 1, everything else would be unexpected
            if (tokens.Count != 1)
            {
                throw new ArgumentException("Unsupported prompt: The prompt did not contain anything that can be calculated.");
            }

            int result = 0;

            foreach (Match tokenMatch in tokens)
            {   

                CaptureCollection operandCapCol = tokenMatch.Groups["operand"].Captures;
                CaptureCollection operationCapCol = tokenMatch.Groups["operation"].Captures;

                // handle single number w/o operation 
                if (operationCapCol.Count < 1 && operandCapCol.Count == 1) 
                {
                    return int.Parse(operandCapCol[0].Value);
                }

                // invalid operand / operation counts -> one operation always needs 2 operands
                if (!((operandCapCol.Count - 1) == operationCapCol.Count))
                {
                    throw new ArgumentException("Not a valid operation/operand combination");
                }

                for (int i = 0; i < operandCapCol.Count; i++)
                {

                    if (i == 0)
                    {
                        result = int.Parse(operandCapCol[i].Value);
                    }
                    
                    if (!(i == operandCapCol.Count - 1))
                    {
                        result = Calculate(result, operationCapCol[i].Value, int.Parse(operandCapCol[i + 1].Value));
                    }

                }

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