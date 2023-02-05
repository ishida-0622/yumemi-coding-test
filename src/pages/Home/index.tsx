import { useState } from 'react';
import { Header } from 'components/organisms/Header';
import { Footer } from 'components/organisms/Footer';
import { Checkbox } from 'components/atoms/Checkbox';
import { NowLoading } from 'components/atoms/NowLoading';
import { Chart } from 'components/organisms/Chart';
import { usePopulation } from 'hooks/usePopulation';
import { usePrefectures } from 'hooks/usePrefectures';

export const Home = () => {
  const { prefectures, isLoading, error } = usePrefectures();
  const { populations, getPopulations } = usePopulation();
  const [selected, setSelected] = useState<boolean[]>(Array(47).fill(false));

  const handleCheckboxOnchange = (prefCode: number) => {
    const newSelected = selected.map((v, i) => (i === prefCode - 1 ? !v : v));
    getPopulations(
      prefectures.filter((pref) => newSelected[pref.prefCode - 1])
    );
    setSelected(newSelected);
  };

  return (
    <>
      <Header />
      {isLoading && <NowLoading />}
      {error !== '' && <h2>{error}</h2>}
      {prefectures.map((pref) => (
        <Checkbox
          key={pref.prefCode}
          checked={selected[pref.prefCode - 1]}
          onChange={() => handleCheckboxOnchange(pref.prefCode)}
        >
          {pref.prefName}
        </Checkbox>
      ))}
      <Chart populations={populations} />
      <Footer />
    </>
  );
};
