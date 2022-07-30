import styled from "styled-components";
import {useRef,useState} from "react";

const Item = styled.div`
    background-color: rgb(240,240,240);
    margin-bottom:10px;
    padding:20px;
`

const Span = styled.span`
    margin-right: 10px;
`

const Info = styled.div`
    border-bottom: 1px solid gray;
    padding-bottom: 10px;
    margin-bottom: 10px;
`

const DateDiv = styled.div`
    color: gray;
`

const Content = styled.div`
    margin-bottom: 30px;
    margin-top: 30px;
    font-weight: bold;
`

const Textarea = styled.textarea`
    padding:10px;
`

const DiaryItem = ({onEdit,onRemove,id,author,content,emotion,created_date}) =>{
    
    const localContentInput = useRef();
    const [localContent,setLocalContent] = useState(content);
    const [isEdit,setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);
    
    const handleClickRemove = () =>{
        if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)){
            onRemove(id);
        }
    };
    
    const handleQuitEdit = () =>{
        setIsEdit(false);
        setLocalContent(content);
    };
    
    const handleEdit = () =>{
        if(localContent.length < 5){
            localContentInput.current.focus();
            return;
        }
        
        if(window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)){
            onEdit(id,localContent);
            toggleIsEdit();
        }
    };
    
    return(
        <Item>
            <Info>
                <Span>
                | 작성자 : {author} | 감정점수 : {emotion} |
                </Span>
                <br></br>
                <DateDiv>{new Date(created_date).toLocaleString()}</DateDiv>
            </Info>
            <Content>{isEdit?(
                <Textarea
                    ref={localContentInput}
                    value = {localContent}
                    onChange={(e)=> setLocalContent(e.target.value)}></Textarea>):(content)}
            </Content>
            {isEdit?(<>
                <button onClick={handleQuitEdit}>수정 취소</button>
                <button onClick={handleEdit}>수정 완료</button>
            </>):(
            <>
                <button onClick={handleClickRemove}>삭제하기</button>
                <button onClick = {toggleIsEdit}>수정하기</button>
            </>
                )}
        </Item>
    );
};

export default DiaryItem;