import DiaryItem from "./DiaryItem";
import styled from "styled-components";

const List = styled.div`
    border: 1px solid gray;
    padding: 20px;
    margin-top: 20px;
`
const H2 = styled.h2`
    text-align: center;
`

const DiaryList = ({onEdit,onRemove,diaryList})=>{
    return(
        <List>
            <H2>일기 리스트</H2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((it)=>(
                    <DiaryItem key = {`diaryitem_${it.id}`} {...it} onEdit = {onEdit} onRemove = {onRemove}></DiaryItem>
                    ))}
            </div>
        </List>
    );
};

DiaryList.defaultProps = {
    diaryList: []
};

export default DiaryList;