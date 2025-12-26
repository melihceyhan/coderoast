import { NextRequest, NextResponse } from "next/server";

const CHARACTER_PROMPTS: Record<string, string> = {
  gordon: `You are Gordon Ramsay reviewing code instead of food. You're brutally honest, sarcastic, and use cooking metaphors. 
Example phrases: "This code is so raw, it's still mooing!", "Did you write this in a blender?", "My grandmother could write better code, and she's been dead for 20 years!", "This is absolutely dreadful!", "It's RAWWW!"
Be creative, funny, and savage. Use cooking/kitchen metaphors.`,

  yoda: `You are Yoda from Star Wars reviewing code. Speak in inverted sentences (object-subject-verb pattern). 
Example phrases: "Clean, this code is not.", "Written by a youngling, this was.", "Much to learn, you still have.", "Strong with bugs, this code is.", "Disappointed, the Force is."
Be wise but savage. Mix ancient wisdom with brutal burns.`,

  shakespeare: `You are William Shakespeare reviewing code. Speak in Elizabethan English with dramatic flair.
Example phrases: "What foul spaghetti code doth mine eyes behold!", "Thou hast committed crimes against programming most grievous!", "To refactor, or not to refactor - that is not even a question here!", "This code is a tragedy, not a comedy!", "Fie upon this wretched mess!"
Be poetic, dramatic, and devastatingly eloquent.`,

  turkbaba: `You are a disappointed Turkish father reviewing your child's code. Speak in Turkish mixed with some English tech terms.
Example phrases: "Oğlum bu ne ya?", "Ben bunun için mi okuttum seni?", "Komşunun oğlu Google'da çalışıyor, sen bu kodu mu yazıyorsun?", "Baban olarak utanıyorum", "Dayının oğlu bile daha iyi kod yazar!"
Be disappointed, compare to successful cousins, reference Turkish family dynamics. Mix Turkish and English.`,

  pirate: `You are Captain Blackbeard, a salty pirate captain reviewing code.
Example phrases: "Arr, what bilge water be this?", "This code be more tangled than me anchor chain!", "Ye code like a landlubber!", "I've seen better logic in a drunken parrot!", "This be worthy of Davy Jones' locker!"
Use pirate speak, nautical metaphors, and salty insults.`,

  drill: `You are a military drill sergeant reviewing code.
Example phrases: "WHAT IN THE SWEET NAME OF BINARY IS THIS?!", "DROP AND GIVE ME 20 UNIT TESTS!", "MY DEAD GRANDMOTHER COULD WRITE BETTER CODE!", "THIS CODE IS A DISGRACE TO THE UNIFORM!", "DID YOUR MOMMY WRITE THIS FOR YOU?!"
SHOUT everything, use military jargon, demand exercises for mistakes.`,
};

// Mock roasts for demo (when no API key is available)
const MOCK_ROASTS: Record<string, string[]> = {
  gordon: [
    "Bloody hell, what is THIS?! This code is so raw, it's still trying to compile! I've seen better structure in a demolished building. You call yourself a developer? My RISOTTO has better organization than this spaghetti mess!",
    "Oh for crying out loud! This code is absolutely DREADFUL! It's like someone threw syntax at a wall and hoped it would stick. I wouldn't serve this to my worst enemy's CI/CD pipeline!",
    "Listen here, you donut! This code is so undercooked, it's still pseudocode! The variables are all over the place like a bloody kitchen disaster. GET IT TOGETHER!",
  ],
  yoda: [
    "Hmm, disturbing this code is. Written by a youngling who skipped their training, this was. Clean, this is not. Refactor you must, or forever in the dark side of technical debt you will remain. Much to learn, you still have.",
    "Sense this code makes not. Strong with bugs, the force in this code is. Meditate on your design patterns, you should. Disappointed, Master Programmer would be.",
    "Confused, I am. Spaghetti code, this reminds me of. Path to maintenance hell, this leads. Return to the basics, you must. Written in anger, this was.",
  ],
  shakespeare: [
    "What foul and pestilent congregation of bytes doth mine eyes behold! This code, a tragedy most profound, would make the Bard himself weep bitter tears. Thou hast committed crimes against the sacred art of programming that not even a thousand refactors could absolve!",
    "Hark! What wretched assembly of functions through yonder IDE breaks? It is the code, and it is TERRIBLE! To deploy or not to deploy - nay, burn it with fire and start anew, for this be an abomination!",
    "O woeful day! This code doth murder sleep and sanity alike. Shakespeare wrote tragedies, but nothing so horrific as this. Thy variables art named like a drunken fool's ramblings!",
  ],
  turkbaba: [
    "Oğlum bu ne ya?! Ben seni bunun için mi okuttum? Komşunun oğlu Ahmet Google'da çalışıyor, 500 bin dolar maaş alıyor. Sen bu kodu mu yazıyorsun? Dayının oğlu bile daha iyi kod yazar, o da lise terk! Yazıklar olsun!",
    "Ya Allah'ım bu ne? Baban olarak utanıyorum! Halacının oğlu Microsoft'ta, teyzecinin kızı Apple'da. Sen bana bu spagetti kodu mu gösteriyorsun? Bunun için mi gece gündüz çalıştım?!",
    "Oğlum sen programcı mısın yoksa random generator mı? Bu değişken isimleri ne? Amcaoğlu bile daha düzgün kod yazar. Git bi' çay koy da kendine gel!",
  ],
  pirate: [
    "Arr, what be this bilge water ye call code?! I've seen better logic in a drunken parrot! This code be more tangled than me anchor chain after a storm. Ye code like a landlubber who's never seen a terminal before!",
    "Shiver me timbers! This code be worthy of Davy Jones' locker! Me wooden leg could write better functions than this. Ye call yerself a developer? I've met barnacles with better programming skills!",
    "Blimey! What scurvy code be this?! The syntax be all wrong, like a ship without a rudder. Walk the plank, ye code! And take yer developer with ye!",
  ],
  drill: [
    "WHAT IN THE SWEET NAME OF BINARY IS THIS GARBAGE?! I'VE SEEN BETTER CODE WRITTEN BY RECRUITS ON THEIR FIRST DAY! DROP AND GIVE ME 50 UNIT TESTS, MAGGOT! THIS CODE IS A DISGRACE TO DEVELOPERS EVERYWHERE!",
    "LISTEN UP, PRIVATE! THIS CODE IS SO BAD, IT MADE MY COMPILER CRY! DID YOUR MOMMY WRITE THIS FOR YOU?! MY DEAD GRANDMOTHER COULD REFACTOR THIS IN HER SLEEP! NOW GET DOWN AND DEBUG!",
    "ATTENTION! THIS CODE IS UNACCEPTABLE! I WANT TO SEE PROPER INDENTATION, MEANINGFUL VARIABLE NAMES, AND COMMENTS BY 0600 HOURS! MOVE IT, MOVE IT, MOVE IT!",
  ],
};

function getRandomRoast(characterId: string): string {
  const roasts = MOCK_ROASTS[characterId] || MOCK_ROASTS.gordon;
  return roasts[Math.floor(Math.random() * roasts.length)];
}

function calculateSeverity(roast: string): number {
  // Simple severity calculation based on roast characteristics
  let severity = 5;

  const harshWords = [
    "terrible",
    "awful",
    "disaster",
    "garbage",
    "horrible",
    "worst",
    "disgrace",
    "abomination",
    "dreadful",
    "pathetic",
  ];
  const capsCount = (roast.match(/[A-Z]{3,}/g) || []).length;
  const exclamationCount = (roast.match(/!/g) || []).length;

  harshWords.forEach((word) => {
    if (roast.toLowerCase().includes(word)) severity += 0.5;
  });

  severity += Math.min(capsCount * 0.3, 2);
  severity += Math.min(exclamationCount * 0.2, 1.5);

  return Math.min(Math.max(Math.round(severity * 10) / 10, 1), 10);
}

export async function POST(request: NextRequest) {
  try {
    const { code, characterId } = await request.json();

    if (!code || !characterId) {
      return NextResponse.json(
        { error: "Code and character are required" },
        { status: 400 }
      );
    }

    // Check if OpenAI API key is available
    const apiKey = process.env.OPENAI_API_KEY;

    let roast: string;

    if (apiKey) {
      // Use OpenAI API
      const characterPrompt = CHARACTER_PROMPTS[characterId] || CHARACTER_PROMPTS.gordon;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `${characterPrompt}

Your task: Review the following code and roast it mercilessly in character. Be funny, creative, and brutal but keep it PG-13. 
- Point out specific issues you see in the code
- Use the character's unique style and catchphrases
- Keep the roast between 2-4 sentences
- Be entertaining above all else`,
            },
            {
              role: "user",
              content: `Please roast this code:\n\n${code}`,
            },
          ],
          temperature: 0.9,
          max_tokens: 300,
        }),
      });

      if (!response.ok) {
        throw new Error("OpenAI API error");
      }

      const data = await response.json();
      roast = data.choices[0].message.content;
    } else {
      // Use mock roasts for demo
      // Add a small delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      roast = getRandomRoast(characterId);
    }

    const severity = calculateSeverity(roast);

    return NextResponse.json({
      roast,
      severity,
      characterId,
    });
  } catch (error) {
    console.error("Roast API error:", error);
    return NextResponse.json(
      { error: "Failed to generate roast" },
      { status: 500 }
    );
  }
}

