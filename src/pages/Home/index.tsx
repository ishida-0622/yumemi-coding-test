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

  const handleCheckboxOnChange = (prefCode: number) => {
    const newSelected = selected.map((v, i) => (i === prefCode - 1 ? !v : v));
    getPopulations(
      prefectures.filter((pref) => newSelected[pref.prefCode - 1])
    );
    setSelected(newSelected);
  };

  return (
    <>
      <Header />
      <main>
        {isLoading && <NowLoading />}
        {error !== '' && <h2>{error}</h2>}
        <p>都道府県</p>
        <section className="pref-checkboxes">
          <ul>
            {prefectures.map((pref) => (
              <li key={pref.prefCode}>
                <Checkbox
                  checked={selected[pref.prefCode - 1]}
                  onChange={() => handleCheckboxOnChange(pref.prefCode)}
                >
                  {pref.prefName}
                </Checkbox>
              </li>
            ))}
          </ul>
        </section>
        <section className="pop-chart">
          <Chart populations={populations} />
        </section>
      </main>
      <Footer />
    </>
  );
};
