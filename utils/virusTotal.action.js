"use server";

export const urlScanAnalyse = async (url) => {
  try {
    // Encode the URL
    const encodedUrl = new URLSearchParams();
    encodedUrl.append("url", url);
    // console.log(encodedUrl);
    

    const response = await fetch("https://www.virustotal.com/api/v3/urls", {
      method: "POST",
      headers: {
        accept: "application/json",
        "x-apikey": process.env.VIRUSTOTAL_API_KEY,
      },
      body: encodedUrl,
    });

    const res = await response.json();
    // console.log(res);

    if (!res) return null;

    const fetchResult = await fetch(
      `https://www.virustotal.com/api/v3/analyses/${res.data.id}`, // ex: NDFmMTJhZTUzYjg0Y2NmYjM4NTc5YTZiOTQ5Mzg2ODU6MTcyODk5OTI3NQ==
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-apikey": process.env.VIRUSTOTAL_API_KEY,
        },
      }
    );
    const result = await fetchResult.json();
    // console.log(result);
    if (result) return result.data;
  } catch (err) {
    console.error(err);
  }
};

export const fileScanAnalyse = async (file) => {
  try {
    const response = await fetch("https://www.virustotal.com/api/v3/files", {
      method: "POST",
      headers: {
        accept: "application/json",
        "x-apikey": process.env.VIRUSTOTAL_API_KEY,
      },
      body: file,
    });

    const res = await response.json();
    // console.log(res);

    if (!res) return null;

    const fetchResult = await fetch(
      `https://www.virustotal.com/api/v3/analyses/${res.data.id}`, // ex: NDFmMTJhZTUzYjg0Y2NmYjM4NTc5YTZiOTQ5Mzg2ODU6MTcyODk5OTI3NQ==
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-apikey": process.env.VIRUSTOTAL_API_KEY,
        },
      }
    );
    const result = await fetchResult.json();
    // console.log(result);
    if (result) return result.data;
  } catch (err) {
    console.error(err);
  }
};

export const getAnalyse = async (id) => {
  try {
    const res = await fetch(
      `https://www.virustotal.com/api/v3/analyses/${id}`, // ex: NDFmMTJhZTUzYjg0Y2NmYjM4NTc5YTZiOTQ5Mzg2ODU6MTcyODk5OTI3NQ==
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-apikey": process.env.VIRUSTOTAL_API_KEY,
        },
      }
    );
    const result = await res.json();
    // console.log(result);
    if (result) return result.data;
  } catch (err) {
    console.error(err);
  }
};
