import { useMemo, useState } from "react";

export const Login = () => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

const emailLength = useMemo(() => {
  console.log('Executou')
  return email.length * 1000
}, [email.length])
    
  const handleEntrar = () => {
      console.log(email)
      console.log(password)
}

  return (
    <div>
      <form>
        <p>Quantidade de caracteres no email: {emailLength}</p>

        <label>
          <span>Email</span>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </label>

        <label>
          <span>Senha</span>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </label>

        <button type="button" onClick={handleEntrar}>
          Entrar
        </button>

      </form>
    </div>
  );
};
