import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser, OutputFixingParser } from 'langchain/output_parsers'
import { z } from 'zod'
import { PromptTemplate } from 'langchain/prompts'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z.string().describe('The mood of the person who wrote the journal entry.'),
    summary: z.string().describe('A quick summary of the entire journal entry.'),
    subject: z.string().describe('The subject of the journal entry.'),
    negative: z
      .boolean()
      .describe('is the journal entry negative? (i.e does it contain a negative emotion?).'),
    color: z
      .string()
      .describe(
        'a background color that represents the mood of the journal entry in the tailwind css format. Example "bg-blue-400" for hapiness.',
      ),
  }),
)

export async function getPrompt(content: string) {
  const format_instructions = parser.getFormatInstructions()
  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format({ entry: content })

  return input
}

export const analize = async (entry: string) => {
  const input = await getPrompt(entry)
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' })
  const output = await model.call(input)

  try {
    return parser.parse(output)
  } catch (e) {
    const fixParser = OutputFixingParser.fromLLM(
      new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' }),
      parser,
    )
    const fix = await fixParser.parse(output)
    return fix
  }
}
