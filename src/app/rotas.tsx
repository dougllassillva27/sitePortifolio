import { Route, Routes } from 'react-router-dom';
import { LayoutPrincipal } from '../components/layout/LayoutPrincipal';
import { Agendamento } from '../pages/Agendamento';
import { CancelarAgendamento } from '../pages/CancelarAgendamento';
import { LoginAdmin } from '../pages/LoginAdmin';
import { PaginaInicial } from '../pages/PaginaInicial';
import { PainelAdmin } from '../pages/PainelAdmin';
import { RemarcarAgendamento } from '../pages/RemarcarAgendamento';

export function RotasAplicacao() {
  return (
    <Routes>
      <Route element={<LayoutPrincipal />}>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/agendar" element={<Agendamento />} />
        <Route path="/cancelar" element={<CancelarAgendamento />} />
        <Route path="/remarcar" element={<RemarcarAgendamento />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin" element={<PainelAdmin />} />
      </Route>
    </Routes>
  );
}
