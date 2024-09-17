"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";

const API_URL = "https://api.finefoods.refine.dev";

export const dataProvider = dataProviderSimpleRest(API_URL);
