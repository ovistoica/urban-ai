import type {NextApiRequest, NextApiResponse} from 'next';

import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function createSlangExplainCompletion(slang: string) {
  return await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: 'Translate this into everyday language: \n' + slang,
  });
}

export async function createCompletion(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);
  const {prompt} = body;
  console.log(body);

  if (!prompt) {
    return res.status(400).json({message: 'Missing completion input.'});
  }

  try {
    const {data} = await createSlangExplainCompletion(prompt);
    console.log(data);
    return res.status(200).json(data);
  } catch (_) {
    return res.status(400).json({message: 'Unexpected error occurred.'});
  }
}
