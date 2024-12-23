import { GOOGLE_SHEETS_CONFIG } from '../config/api';
import { fetchFromAPI } from './api';
import type { SheetRow } from '../types/sheets';

interface GoogleSheetsResponse {
  values?: string[][];
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

function buildSheetsUrl(spreadsheetId: string, apiKey: string): string {
  const { BASE_URL, SHEET_RANGE } = GOOGLE_SHEETS_CONFIG;
  return `${BASE_URL}/${spreadsheetId}/values/${SHEET_RANGE}?key=${apiKey}&valueRenderOption=FORMATTED_VALUE`;
}

function transformSheetData(data: GoogleSheetsResponse): SheetRow[] {
  if (!data.values || data.values.length < 2) {
    console.log('No data found in sheet');
    return [];
  }

  const [headers, ...rows] = data.values;
  
  return rows.map(row => {
    const rowData: SheetRow = {};
    headers.forEach((header, index) => {
      rowData[header] = row[index] || '';
    });
    return rowData;
  });
}

export async function fetchSheetData(): Promise<SheetRow[]> {
  try {
    const { API_KEY, SPREADSHEET_ID } = GOOGLE_SHEETS_CONFIG;
    const endpoint = buildSheetsUrl(SPREADSHEET_ID, API_KEY);
    
    const data = await fetchFromAPI<GoogleSheetsResponse>(endpoint);
    return transformSheetData(data);
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw error;
  }
}