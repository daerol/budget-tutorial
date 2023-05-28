import { Container } from "semantic-ui-react";
import MainHeader from "./components/MainHeader";
import NewEntryForm from "./components/NewEntryForm";
import DisplayBalance from "./components/DisplayBalance";
import DisplayBalances from "./components/DisplayBalances";
import EntryLines from "./components/EntryLines";
import ModalEdit from "./components/ModalEdit";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllEntries } from "./actions/entries.actions";
import "./App.css";

function App() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [entry, setEntry] = useState();
  const entries = useSelector((state) => state.entries);
  const { isOpen, id } = useSelector((state) => state.modals);

  useEffect(() => {
    const index = entries.findIndex((entry) => entry.id === id);
    setEntry(entries[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, id, entries]);

  useEffect(() => {
    let totalIncomes = 0;
    let totalExpenses = 0;
    entries.map((entry) => {
      if (entry.isExpense) {
        return (totalExpenses += Number(entry.value));
      }
      return (totalIncomes += Number(entry.value));
    });
    setTotal(totalIncomes - totalExpenses);
    setExpenseTotal(totalExpenses);
    setIncomeTotal(totalIncomes);
  }, [entries]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEntries());
  }, [dispatch]);

  return (
    <Container>
      <MainHeader title="Budget" />

      <DisplayBalance
        title="Your Balance:"
        value={total}
        color="black"
        size="small"
      />
      <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal} />
      <EntryLines entries={entries} />
      <MainHeader title="History" type="h3" />

      <MainHeader title="Add new transactions" type="h3" />
      <NewEntryForm />
      <ModalEdit isOpen={isOpen} {...entry} />
    </Container>
  );
}

export default App;
