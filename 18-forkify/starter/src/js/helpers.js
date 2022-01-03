import { TIMEOUT_SEC } from "./config";
import { uploadRecipe } from "./model";

const timeout = function (s) {
    return new Promise(function (_, reject) {
    setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
    });
};

export const AJAX = async function(url, upLoadData = undefined){
    try{
        
        const fetchPro = upLoadData ? fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(upLoadData),
        }) : fetch(url);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if(!res.ok) throw new Error(`${data.message} (${res.status})💣`);
        // console.log(res, data);

        return data;
    }catch(err){
        throw err;
    }
};


// export const getJSON = async function(url){
//     try { 
//         const fetchPro = fetch(url);
//         const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//         const data = await res.json();

//         if(!res.ok) throw new Error(`${data.message} (${res.status})💣`);
//         // .log(res, data);

//         return data;
//     }catch(err){
//         throw err;
//     }
// };

// export const sendJSON = async function(url, upLoadData){
//     try { 
//         const fetchPro = fetch(url,{
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(upLoadData),
//         });
//         const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//         const data = await res.json();

//         if(!res.ok) throw new Error(`${data.message} (${res.status})💣`);
//         //// .log(res, data);

//         return data;
//     }catch(err){
//         throw err;
//     }
// };
