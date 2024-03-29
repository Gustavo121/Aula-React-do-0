import { useCallback, useEffect, useState } from 'react';

import { ITarefa, TarefasService } from '../../shared/services/api/tarefas/TarefasService';
import { ApiException } from '../../shared/services/api/ApiException';



export const Dashboard = () => {
    const [lista, setLista] = useState<ITarefa[]>([]);

    useEffect(() => {
      TarefasService.getAll()
        .then((result) => {
          if (result instanceof ApiException) {
            alert(result.message);
          } else{
            setLista(result);
          }
        })
    }, []);

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
      if (e.key === 'Enter') {
        if(e.currentTarget.value.trim().length === 0) return;

        const value = e.currentTarget.value;

        e.currentTarget.value = ''

        if (lista.some((listItem) => listItem.title === value)) return;

        TarefasService.create({ title: value, isCompleted: false })
        .then((result) => {
          if(result instanceof ApiException) {
            alert(result.message);
          } else {
            setLista((oldLista) => [...oldLista, result]);
          }  
        });
      }
    }, [lista]);

    return (
        <div>
           <p>Listas</p>

           <input onKeyDown={handleInputKeyDown} />

           <p>{lista.filter((listItem) => listItem.isCompleted).length}</p>

           <ul>
             {lista.map((listItem, index) => {
                return <li key={listItem.id}>
                  <input 
                  type="checkbox"
                  checked={listItem.isCompleted}
                  onChange={() => {
                    setLista(oldLista => {
                      return oldLista.map(oldListItem => {
                        const newIsCompleted = oldListItem.title === listItem.title
                        ? !oldListItem.isCompleted
                        : oldListItem.isCompleted;

                        return {
                        ...oldListItem,
                        isCompleted: newIsCompleted,
                        };
                      });
                    });
                  }}
                />
                  {listItem.title}</li>;
             })}
           </ul>

        </div>        
    );
}