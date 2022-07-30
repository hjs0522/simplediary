import styled from "styled-components";
import React, { useState,useRef } from "react";

const Editor = styled.div`
border: 1px solid gray;
text-align: center;
padding: 20px;
`

const Input = styled.input`
    margin-bottom: 20px;
    width: 500px;
    padding: 10px;
`

const Textarea = styled.textarea`
    margin-bottom: 20px;
    width: 500px;
    padding:10px;
    height:150px;
`
const Select = styled.select`
    width: 300px;
    padding: 10px;
    margin-bottom: 20px;
`

const Button = styled.button`
    width:500px;
    padding: 10px;
    cursor:pointer;
`

const DiaryEditor = ({onCreate}) =>{
    const [state,setState] = useState({
        author:"",
        content:"",
        emotion:1
    });
    
    const authorInput = useRef();
    const contentInput = useRef();
    
    const handleChangeState = e =>{
        setState({
            ...state,
            [e.target.name] : e.target.value
        });
    };
    
    const handleSubmit = () =>{
        
        if(state.author.length < 1){
            authorInput.current.focus();
            return;
        }
        
        if(state.content.length < 5){
            contentInput.current.focus();
            return;
        }
        
        console.log(state.author,state.content,state.emotion);
        onCreate(state.author,state.content,state.emotion);
        alert("저장 성공!");
        setState({
            author:"",
            content:"",
            emotion:1
        });
    };
    
    
    
    return(
        <Editor>
            <h2>오늘의 일기</h2>
            <div>
                <Input
                    ref = {authorInput}
                    value={state.author}
                    onChange={handleChangeState}
                    name="author"
                    placeholder="작성자"
                    type="text">
                </Input>
            </div>
            <div>
                <Textarea
                    ref = {contentInput}
                    value={state.content}
                    onChange={handleChangeState}
                    name="content"
                    placeholder="일기"
                    type="text">
                </Textarea>
            </div>
            <div>
                <span>오늘의 감정점수 : </span>
                <Select
                    name="emotion"
                    value={state.emotion}
                    onChange={handleChangeState}
                >
                    <option value ={1}>1</option>
                    <option value ={2}>2</option>
                    <option value ={3}>3</option>
                    <option value ={4}>4</option>
                    <option value ={5}>5</option>
                </Select>
                    
            </div>
            <div>
                <Button onClick={handleSubmit}>일기 저장하기</Button>
            </div>
        </Editor>
    );
};

export default React.memo(DiaryEditor);