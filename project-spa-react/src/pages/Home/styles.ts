import styled from "styled-components";

export const HomeContainer = styled.main`
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }

`

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    flex-wrap: wrap;
    font-weight: bold;
    gap: 0.5rem;
    color: ${props => props.theme["gray-100"]} ;
`

const BaseInput = styled.input`
    background: transparent;
    height: 2.5rem;
    border: 0;
    border-bottom: 2px solid ${ props => props.theme["gray-500"]};
    font-weight: bold;
    padding: 0 0.5rem;
    font-size: 1.125rem;
    color: ${ props => props.theme["gray-100"]};


    &:focus{
        box-shadow: none;
        border-color: ${ props => props.theme["green-500"]};
    }
    &::placeholder{
        color: ${ props => props.theme["gray-500"]};
    }

`

export const TaskInput = styled(BaseInput)`
    flex: 1;
    &::-webkit-calendar-picker-indicator{
        display: none !important;
    }
`

export const MinutesAmountInput = styled(BaseInput)`
    width: 4rem;
`



export const CounterdownContainer = styled.div`
    font-family: 'Roboto Mono', monospace;
    font-size: 10rem;
    line-height: 8rem;
    color: ${props => props.theme["gray-100"]} ;


    

    display: flex;
    gap: 1rem;

    span{
        background:${props => props.theme["gray-700"]} ; 
        padding: 2rem 1rem;
        border-radius: 8px;
    }
`

export const Separator = styled.div`
    padding: 2rem 0;
    color: ${props => props.theme["green-500"]} ;

    width: 4rem;
    overflow: hidden;
    display: flex;
    justify-content: center;


`

export const StartCountDownButton = styled.button`
    border-radius: 8px;
    border: none;
    width: 100%;
    padding: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    font-weight: bold;


    background: ${props => props.theme["green-500"]} ;
    color: ${props => props.theme["gray-100"]} ;

    &:not(:disabled):hover{
        color: ${props => props.theme["green-700"]} ;
    }

    &:disabled{
        opacity: .7;
        cursor: not-allowed;
    }


`
export const StopCountDownButton = styled.button`
    border-radius: 8px;
    border: none;
    width: 100%;
    padding: 1rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    font-weight: bold;


    background: ${props => props.theme["red-500"]} ;
    color: ${props => props.theme["gray-100"]} ;

    &:not(:disabled):hover{
        color: ${props => props.theme["red-700"]} ;
    }

    &:disabled{
        opacity: .7;
        cursor: not-allowed;
    }


`


