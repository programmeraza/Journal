import './App.css';
import JournalList from './components/JournalList/JournalList';
import Logo from './components/Logo/Logo';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/Journaltem';
import LeftPanel from './components/layouts/LeftPanel/LeftPanel';
import Body from './components/layouts/Body/Body';
import JournalForm from './components/JournalForm/JournalForm';
import { useEffect, useState } from 'react'; 

// const INITIAL_DATA = [
//   {
//     title: 'Подготовка к обновлению курсов',
//     date: new Date(),
//     text: 'Сегодня провёл весь день за...',
//     id: 1
//   },
//   {
//     title: 'Поход в годы',
//     date: new Date(),
//     text: 'Думал, что очень много време...',
//     id: 2
//   },
//   {
//     title: 'Первая заметка',
//     date: new Date(),
//     text: 'Создал первую заметку, чтобы ...',
//     id: 3
//   }
// ]

function App() {
  // const [items, setItems] = useState(INITIAL_DATA)
  const [item, setItem] = useState([]);

  useEffect(() => {
    if (item.length) {
      console.log('Запись')
      localStorage.setItem('data', JSON.stringify(item))
    }
  }, [item])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('data'));
    if (data) {
      setItem(data.map(item => ({
        ...item,
        date: new Date(item.date)
      })))
    }
  }, [])


  const addItem = item => {
    setItem(oldItems => [...oldItems,{
      text: item.text,
      title: item.title,
      date: new Date(item.date),
      id: Date.toString().slice(8)
    }

    ]);
  };

  const sortItems = (a, b) => {
    if(a.date < b.date) {
      return 1;
    } else {
      return -1
    }
  }

  return  <div className='app'>

      <LeftPanel>

        <Logo />

        <JournalAddButton />

        <JournalList>

          {item.sort(sortItems).map(elem => 

            <CardButton key={elem.id}>

              <JournalItem title={elem.title} text={elem.text} date={elem.date} />

            </CardButton>

          )}

        </JournalList>

      </LeftPanel>

      <Body>

        <JournalForm onSubmit={addItem} />
        
      </Body>

      </div>
      
}

      export default App;
