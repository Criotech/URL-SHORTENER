import React, { useState, useEffect } from 'react';
import './App.css';
import ShortenerService from './services/shortener.service';
import { IShortURL } from './types';
import Header from './components/Header';
import InputComponent from './components/InputCompnent';
import TableComponent from './components/TableComponent';

function App() {
  const [loading, setLoading] = useState(false);
  const [allUrlData, setShortAllURL] = useState<IShortURL[]>([]);
  const [url, setUrl] = useState<{ fullUrl: string }>({ fullUrl: '' });
  const [errMessage, setErrorMessage] = useState<string>("");

  const getAllUrls = async () => {
    try {
      let res = await ShortenerService.getAll();
      setShortAllURL(res.data.data);
    } catch (e: any) {
      setErrorMessage(e.response.data.err);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('hello world')
    setUrl({ ...url, [e.target.name]: e.target.value });
    setErrorMessage('');
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!url.fullUrl) {
      setErrorMessage("Field is required");
      return;
    }

    try {
      setLoading(true);
      let res = await ShortenerService.create(url);

      const { fullUrl, short, clicks, createdAt, updatedAt, _id } = res.data.data;
      const data: IShortURL = { fullUrl, short, clicks, createdAt, updatedAt, _id }

      setShortAllURL([...allUrlData, data]);
      setLoading(false);
      setUrl({ fullUrl: "" });
    } catch (e:any) {
      setLoading(false);
      setErrorMessage(e.response.data.err)
    }
  }

  useEffect(() => {
    getAllUrls();
  }, [])

  return (
    <div className="App">
      <Header />
      <InputComponent handleChange={handleChange} url={url} handleSubmit={handleSubmit} loading={loading} errMessage={errMessage} />
      <TableComponent data={allUrlData} />
    </div>
  );
}

export default App;
