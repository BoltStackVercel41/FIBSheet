import React, { useEffect, useState } from 'react';
import { Table } from 'lucide-react';
import { DataTable } from './components/DataTable';
import { fetchSheetData } from './utils/sheets';
import type { SheetRow } from './types/sheets';

function App() {
  const [data, setData] = useState<SheetRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const sheetData = await fetchSheetData();
        setData(sheetData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center mb-6">
            <Table className="h-6 w-6 text-gray-600 mr-2" />
            <h1 className="text-2xl font-semibold text-gray-900">Google Sheets Data</h1>
          </div>
          <div className="bg-white rounded-lg shadow">
            <DataTable
              data={data}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;