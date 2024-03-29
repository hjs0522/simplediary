import {useCallback,useMemo, useReducer,useRef,useEffect } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const reducer = (state,action) =>{
  switch(action.type){
    case "INIT":{
      return action.data
    }
    case "CREATE":{
      return [action.data,...state]
    }
    case "REMOVE":{
      return state.filter((it)=> it.id !== action.targetId);
      
    }
    case "EDIT":{
      return state.map((it)=>
      it.id === action.targetId ? {...it,content:action.newContent} : it)}
    default:
      return state;
  }
}

function App() {
  const [data,dispatch] = useReducer(reducer,[]);
  const dataId = useRef(0);
  
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 10).map((it) => {
      
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime() + 1,
        id: dataId.current++
      };
    });

    dispatch({type:"INIT",data: initData});
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);
  
  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current++
    };
    dispatch({type:"CREATE",data:newItem});
  },[]);
  
  const onRemove = useCallback((targetId) =>{
    dispatch({type:"REMOVE",targetId});
  },[]);

  const onEdit = useCallback((targetId,newContent) => {
    dispatch({type:"EDIT",targetId,newContent});
  },[]);
  
  const getDiaryAnalysis = useMemo(() => {
    if (data.length === 0) {
      return { goodcount: 0, badCount: 0, goodRatio: 0 };
    }
    console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100.0;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
  
  return (
    <div className="App">
      <DiaryEditor onCreate = {onCreate}></DiaryEditor>
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList onEdit = {onEdit} onRemove = {onRemove} diaryList={data}></DiaryList>
    </div>
  );
}

export default App;
