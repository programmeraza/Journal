import React, { useRef, useState } from 'react';
import './JournalForm.css';
import Button from '../Button/Button';

function JournalForm({ onSubmit }) {
    const [errors, setErrors] = useState({});
    const [disableValidation, setDisableValidation] = useState(false);

    const addJournalItem = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        
        const requiredFields = ['title', 'date', 'text'];
        const newErrors = {};
        requiredFields.forEach(field => {
            if (!formProps[field]) {
                newErrors[field] = true;
            }
        });
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            onSubmit(formProps);
        } else {
            setDisableValidation(true);
            setTimeout(() => {
                setDisableValidation(false);
                setErrors({});
            }, 2000); 
        }
    };  

    const onReset = () => {
        localStorage.removeItem('data');
        location.reload();
    }

    const inputEl = useRef(null);
    const inputLe = useRef(null);
    const inputEr = useRef(null);
 
    const onButtonClick = () => {
        inputEl.current.value='';
        inputLe.current.value='';
        inputEr.current.value='';
    };

    return (
        <>
        <form className='journal-form' onSubmit={addJournalItem}>
            <div className={`text__flex ${errors.title && 'error'} ${disableValidation ? 'disable-validation' : ''}`}>
                <input className={`journal-form__text ${errors.title && 'error'}`} ref={inputEr} type='text' name='title' placeholder='Напиши своё воспоминание' />
                <button type='button' className='btn__gg' onClick={onButtonClick}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.4">
                        <rect x="0.5" y="0.5" width="29" height="29" rx="14.5" stroke="white" />
                        <path d="M21.6667 8.33334H8.33335C7.41288 8.33334 6.66669 9.07954 6.66669 10V10.8333C6.66669 11.7538 7.41288 12.5 8.33335 12.5H21.6667C22.5872 12.5 23.3334 11.7538 23.3334 10.8333V10C23.3334 9.07954 22.5872 8.33334 21.6667 8.33334Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.33331 12.5V20C8.33331 20.442 8.50891 20.866 8.82147 21.1785C9.13403 21.4911 9.55795 21.6667 9.99998 21.6667H20C20.442 21.6667 20.8659 21.4911 21.1785 21.1785C21.4911 20.866 21.6666 20.442 21.6666 20V12.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.3333 15.8333H16.6666" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                </svg>
                </button>
            </div>
            <div className={`date__flex ${errors.date && 'error'} ${disableValidation ? 'disable-validation' : ''}`}>
                <input className={`journal-form__date ${errors.date && 'error'}`} ref={inputLe} onClick={(e) => e.target.showPicker()} type='date' name='date' />
            </div>
            <div className={`tag__flex ${errors.tag && 'error'} ${disableValidation ? 'disable-validation' : ''}`}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.6">
                        <path d="M3 15H15C15.3978 15 15.7794 14.842 16.0607 14.5607C16.342 14.2794 16.5 13.8978 16.5 13.5V6C16.5 5.60218 16.342 5.22064 16.0607 4.93934C15.7794 4.65804 15.3978 4.5 15 4.5H9.0525C8.80544 4.49872 8.56252 4.43644 8.34532 4.31868C8.12813 4.20092 7.94338 4.03134 7.8075 3.825L7.1925 2.925C7.05662 2.71866 6.87187 2.54908 6.65468 2.43132C6.43748 2.31356 6.19456 2.25128 5.9475 2.25H3C2.60218 2.25 2.22064 2.40804 1.93934 2.68934C1.65804 2.97064 1.5 3.35218 1.5 3.75V13.5C1.5 14.325 2.175 15 3 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                </svg>
                <input className={`journal-form__tag ${errors.tag && 'error'}`} type='text' name='tag' placeholder='Метки' />
            </div>
            <textarea className={`journal-form__textarea ${errors.text && 'textareaError'} ${disableValidation ? 'disable-validation' : ''}`} ref={inputEl} placeholder='Напиши на заметку' name="text" id="" cols="30" rows="10"></textarea>
            <Button text="Сохранить" />
        </form>
        <Button onClick={onReset} text="Очистить" />
        </>
    );
}

export default JournalForm;
