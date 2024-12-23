import React from 'react';
import type { SheetRow } from '../types/sheets';
import { Table } from 'lucide-react';

interface DataTableProps {
  data: SheetRow[];
  isLoading: boolean;
  error: Error | null;
}

export function DataTable({ data, isLoading, error }: DataTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg">
        Error loading data: {error.message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No data available in the sheet
      </div>
    );
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {headers.map((header) => (
                <td
                  key={`${rowIndex}-${header}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {row[header]?.toString() || ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}