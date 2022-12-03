import React, {useState} from 'react';

export default function MainPage() {
  const [phrase, setPhrase] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>('');
  const [meaning, setMeaning] = useState<null | string>('');

  return (
    <div className="isolate bg-white">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"></div>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <div>
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-center sm:text-4xl">
                  Find out what these kids are saying 🧢
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                  Are you tired of feeling out of touch with the younger
                  generation? Are you constantly confused by the slang and lingo
                  they use? Look no further! Our web app is here to help.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();

                    setLoading(true);
                    setError(null);
                    fetch('/api/openai', {
                      method: 'POST',
                      body: JSON.stringify({prompt: phrase}),
                    })
                      .then(async (response) => {
                        if (!response.ok) {
                          setError('Something went wrong');
                        }
                        setLoading(false);
                        const body = await response.json();

                        console.log(body);

                        if (body.choices) {
                          setMeaning(body?.choices?.[0]?.text);
                        }
                      })
                      .catch();
                  }}
                  className="mt-8 flex w-full gap-x-4 sm:justify-center">
                  <div className={'flex w-full flex-col'}>
                    <label
                      htmlFor={'slang'}
                      className="w-full text-center text-xl font-medium text-gray-700">
                      Slang
                    </label>
                    <div className="mt-1 flex w-full">
                      <textarea
                        name={'slang'}
                        value={phrase}
                        onChange={(e) => setPhrase(e.target.value)}
                        id={'slang'}
                        className="block w-full rounded border-gray-300 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder={'Enter slang'}
                      />

                      <button
                        disabled={!phrase}
                        type="submit"
                        className="ml-2 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Find meaning
                      </button>
                    </div>
                  </div>
                </form>
                {loading ? <p>Loading...</p> : null}
                {error ? <p className={'text-red-400'}> {error} </p> : null}
                {meaning ? (
                  <div className="mt-4 rounded-lg border border-gray-200 bg-white px-4 py-2 sm:px-6">
                    <p className={'py-4 text-lg'}> {meaning}</p>
                  </div>
                ) : null}
              </div>
              <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <svg
                  className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                  viewBox="0 0 1155 678"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                    fillOpacity=".3"
                    d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                  />
                  <defs>
                    <linearGradient
                      id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                      x1="1155.49"
                      x2="-78.208"
                      y1=".177"
                      y2="474.645"
                      gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9089FC" />
                      <stop offset={1} stopColor="#FF80B5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
