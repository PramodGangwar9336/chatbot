// import { GoogleGenAI, Type } from "@google/genai";
// import {exec} from "child_process";
// import readlineSync from 'readline-sync';
// import 'dotenv/config'
// import util from "util";
// import os from 'os';

// const platform = os.platform();

// const execute = util.promisify(exec);

// // Configure the client
// const ai = new GoogleGenAI({apiKey:""});



// // tool: 

// async function executeCommand({command}){
    
//     try{
//     const {stdout,stderr}   = await execute(command);
     
//     if(stderr){
//         return `Error: ${stderr}`
//     }

//     return `Success: ${stdout}`

//     }
//     catch(err){
//         return `Error: ${err}`
//     }
// }


// const commandExecuter = {
//     name:"executeCommand",
//     description: "It takes any shell/terminal command and execute it. It will help us to create, read, write, update, delete any folder and file",
//     parameters:{
//         type: Type.OBJECT,
//         properties:{
//             command:{
//                 type:Type.STRING,
//                 description: "It is the terminal/shell command. Ex: mkdir calculator , touch calculator/index.js etc"
//             }
//         },
//         required:['command']
//     }
// }


// const History = [];

// async function buildWebsite() {

    
//     while(true){

//     const result = await ai.models.generateContent({
//         model: "gemini-2.5-flash",
//         contents: History,
//         config: { 
//          systemInstruction:` You are a website Builder, which will create the frontend part of the website using terminal/shell Command.
//          You will give shell/terminal command one by one and our tool will execute it.

//          Give the command according to the Operarting system we are using.
//          My Current user Operating system is: ${platform}.

//          Kindly use best practice for commands, it should handle multine write also efficiently.

//          Your Job
//          1: Analyse the user query
//          2: Take the neccessary action after analysing the query by giving proper shell.command according to the user operating system.

//          Step By Step By Guide

//          1: First you have to create the folder for the website which we have to create, ex: mkdir calculator
//          2: Give shell/terminal command to create html file , ex: touch calculator/index.html
//          3: Give shell/terminal command to create CSS file 
//          4: Give shell/terminal command to create Javascript file 
//          5: Give shell/terminal command to write on html file 
//          6: Give shell/terminal command to write on css file 
//          7: Give shell/terminal command to write on javascript file
//          8: fix the error if they are persent at any step by writing, update or deleti
//          `
//          ,

//          tools: [
//             {
//                 functionDeclarations:[commandExecuter]
//             }
//          ]
//         },
//     });


//     if(result.functionCalls&&result.functionCalls.length>0){

//         const functionCall = result.functionCalls[0];

//         const { name, args } = functionCall;

//         const toolResponse = await executeCommand(args);


//         const functionResponsePart = {
//             name: functionCall.name,
//             response: {
//                 result: toolResponse,
//             },
//         };

//     // Send the function response back to the model.
//     History.push({
//       role: "model",
//       parts: [
//         {
//           functionCall: functionCall,
//         },
//       ],
//     });

//     History.push({
//       role: "user",
//       parts: [
//         {
//           functionResponse: functionResponsePart,
//         },
//       ],

//     })
//     }
//     else{
//         break;
//         console.log(result.text);
//         History.push({
//             role:"model",
//             parts:[{text:result.text}]
//         })
//     }

//     }

    
// }

// import { GoogleGenAI, Type } from "@google/genai";
// import { exec } from "child_process";
// import util from "util";
// import readlineSync from "readline-sync";
// import os from "os";

// const platform = os.platform();
// const execute = util.promisify(exec);

// // Gemini client
// const ai = new GoogleGenAI({
//   apiKey:""
// });

// // ---------------- TOOL ----------------

// async function executeCommand({ command }) {
//   try {
//     const { stdout, stderr } = await execute(command);
//     if (stderr) return `Error: ${stderr}`;
//     return stdout || "Command executed";
//   } catch (err) {
//     return err.message;
//   }
// }

// const commandExecuter = {
//   name: "executeCommand",
//   description: "Execute terminal commands",
//   parameters: {
//     type: Type.OBJECT,
//     properties: {
//       command: {
//         type: Type.STRING
//       }
//     },
//     required: ["command"]
//   }
// };

// // ---------------- MEMORY ----------------
// const History = [];

// // ---------------- AI STEP ----------------

// async function buildWebsiteStep() {
//   const result = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: History,
//     config: {
//       systemInstruction: `
// You are a website builder AI.
// Create frontend using terminal commands only.
// OS: ${platform}
// Give ONE command at a time.
// `,
//       tools: [
//         { functionDeclarations: [commandExecuter] }
//       ]
//     }
//   });

//   // If AI calls tool
//   if (result.functionCalls?.length) {
//     const call = result.functionCalls[0];
//     const toolResult = await executeCommand(call.args);

//     History.push({
//       role: "model",
//       parts: [{ functionCall: call }]
//     });

//     History.push({
//       role: "tool",
//       parts: [{
//         functionResponse: {
//           name: call.name,
//           response: { result: toolResult }
//         }
//       }]
//     });

//     return true; // continue steps
//   }

//   // Normal text → finish
//   console.log(result.text);
//   History.push({
//     role: "model",
//     parts: [{ text: result.text }]
//   });

//   return false;
// }

// // ---------------- MAIN ----------------

// async function main() {
//   console.log("AI Website Builder Started 🚀");

//   while (true) {
//     const question = readlineSync.question("\nAsk me anything --> ");
//     if (question === "exit") break;

//     History.push({
//       role: "user",
//       parts: [{ text: question }]
//     });

//     // run steps until AI finishes
//     while (await buildWebsiteStep()) {}
//   }
// }

// main();






// while(true){

//     const question = readlineSync.question("Ask me anything -->  ");
    
//     if(question=='exit'){
//         break;
//     }
    
//     History.push({
//         role:'user',
//         parts:[{text:question}]
//     });
   
//     awaitbuildWebsite();

// }




// import { GoogleGenAI, Type } from "@google/genai";
// import readlineSync from "readline-sync";

// const ai = new GoogleGenAI({ apiKey:""});

// // weather tool
// async function weatherinformation({ city }) {
//     const response = await fetch(
//         `http://api.weatherapi.com/v1/current.json?key=1a7af95451ba4f6cbe7143022252112&q=${city}
//     ` );
//     const data = await response.json();
//     return data;
// }

// const weatherinfo = {
//     name: "weatherinformation",
//     description: "get current temp for current location",
//     parameters: {
//         type: Type.OBJECT,
//         properties: {
//             city: {
//                 type: Type.STRING,
//                 description: "The city name e.g. Delhi",
//             },
//         },
//     },
//     required: ["city"],
// };

// const tools = [
//     {
//         functionDeclarations: [weatherinfo],
//     },
// ];

// const toolFunctions = {
//     weatherinformation: weatherinformation,
// };

// const History = [];

// async function runAgent() {
//     while (true) {
//         const result = await ai.models.generateContent({
//             model: "gemini-2.0-flash",
//             contents: History,
//             config: { tools },
//         });

//         if (result.functionCalls && result.functionCalls.length > 0) {
//             console.log("My function is called");
//             const functionCall = result.functionCalls[0];
//             const { name, args } = functionCall;

//             const response = await toolFunctions[name](args);

//             const functionResponsePart = {
//                 name: functionCall.name,
//                 response: { result: response },
//             };

//             History.push({
//                 role: "model",
//                 parts: [{ functionCall: functionCall }],
//             });

//             History.push({
//                 role: "user",
//                 parts: [{ functionResponse: functionResponsePart }],
//             });
//         } else {
//             History.push({
//                 role: "model",
//                 parts: [{ text: result.text }],
//             });
//             console.log(result.text);
//             break;
//         }
//     }
// }

// while (true) {
//     const question = readlineSync.question("Ask me anything: ");
//     if (question === "exit") break;

//     History.push({
//         role: "user",
//         parts: [{ text: question }],
//     });

//     await runAgent();
// }





// 


// 







import { GoogleGenAI } from "@google/genai";
import readlineSync from 'readline-sync';
import { exec } from "child_process";
import { promisify } from "util";
import dotenv from "dotenv"

import fs from 'fs';
dotenv.config();

const asyncExecute = promisify(exec);
const writeFileAsync = promisify(fs.writeFile);

const History = [];
const ai = new GoogleGenAI({ });

async function executeCommand({ command, content, filePath }) {
    try {
        if (content && filePath) {
             await writeFileAsync(filePath, content);
            return `Success: File created at ${filePath}`;
        } else if (command) {
            // Execute regular command
            const { stdout, stderr } = await asyncExecute(command);
            if (stderr) {
                return `Error: ${stderr}`;
            }
            return `Success: ${stdout || 'Command executed successfully'}`;
        }
        return 'Error: No command or content provided';
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

const executeCommandDeclaration = {
    name: "executeCommand",
    description: "Execute commands or create files with content on Windows systems",
    parameters: {
        type: 'OBJECT',
        properties: {
            command: {
                type: 'STRING',
                description: 'A Windows terminal command (e.g., "mkdir my-project")'
            },
            content: {
                type: 'STRING',
                description: 'Complete file content to write (for HTML/CSS/JS files)'
            },
            filePath: {
                type: 'STRING',
                description: 'Path where file should be created (e.g., "my-project/index.html")'
            }
        },
    }
}

const availableTools = {
    executeCommand
}

async function runAgent(userProblem) {
    History.push({
        role: 'user',
        parts: [{ text: userProblem }]
    });

    while (true) {
        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: History,
                config: {
                    systemInstruction: `You are an expert Website builder. Follow these steps:
                    
                    1. FIRST create the project folder: mkdir project-name
                    2. THEN create files with COMPLETE TEMPLATES:
                       - index.html (with basic HTML5 structure)
                       - style.css (with basic styles)
                       - script.js (with basic functionality)
                    
                    IMPORTANT:
                    - Use the 'content' parameter to send COMPLETE file content
                    - Always include the 'filePath' parameter when writing files
                    - For folders, use the 'command' parameter with mkdir
                    - Include proper DOCTYPE, meta tags, and semantic HTML
                    - Include responsive CSS (viewport meta, flexible units)
                    - Include DOMContentLoaded event in JavaScript
                    
                    EXAMPLE for a calculator:
                    1. {command: "mkdir calculator"}
                    2. {content: "<!DOCTYPE html>...", filePath: "calculator/index.html"}
                    3. {content: "body { font-family: Arial...}", filePath: "calculator/style.css"}
                    4. {content: "document.addEventListener...", filePath: "calculator/script.js"}`,
                    tools: [{
                        functionDeclarations: [executeCommandDeclaration]
                    }],
                },
            });

            if (response.functionCalls && response.functionCalls.length > 0) {
                const { name, args } = response.functionCalls[0];
                
                if (args.content && args.filePath) {
                    console.log(`Creating file: ${args.filePath}`);
                } else if (args.command) {
                    console.log(`Executing command: ${args.command}`);
                }

                const result = await availableTools[name](args);
                console.log(`Result: ${result}`);

                History.push({
                    role: "model",
                    parts: [{
                        functionCall: response.functionCalls[0],
                    }],
                });

                History.push({
                    role: "user",
                    parts: [{
                        functionResponse: {
                            name: name,
                            response: { result },
                        },
                    }],
                });
            } else {
                History.push({
                    role: 'model',
                    parts: [{ text: response.text }]
                });
                console.log(response.text);
                break;
            }
        } catch (error) {
            console.error("Error:", error);
            break;
        }
    }
}

async function main() {
    console.log("🚀 Website Builder - Describe the website you want to create");
    const userProblem = readlineSync.question("Your idea: ");
    await runAgent(userProblem);
    main();
}

main();