import { Home } from 'lucide-react';
import { Users } from 'lucide-react';
import { MapPinned } from 'lucide-react';
import { Calendar } from 'lucide-react';
import AuthButton from "@/components/AuthButtonServer";
import { Button } from "@/components/ui/button"
 
function ButtonIcon() {
    return (
    <Button variant="outline" size="icon">
        <Home className="h-8 w-8" />
    </Button>
    )
}

function UserIcon() {
    return (
      <Button variant="outline" size="icon">
        <Users className="h-8 w-8" />
      </Button>
    )
}

function MapIcon() {
    return (
    <Button variant="outline" size="icon">
        <MapPinned className="h-8 w-8" />
    </Button>
    )
}

function CalIcon() {
    return (
    <Button variant="outline" size="icon">
        <Calendar className="h-8 w-8" />
    </Button>
    )
}

export default function NavBar() {
    return (
      <nav className="h-full w-full bg-slate-900 text-white flex flex-col items-center">
        <a href="#" className="py-4"><ButtonIcon /></a>
        <a href="#" className="py-4"><UserIcon /></a>
        <a href="#" className="py-4"><MapIcon /></a>
        <a href="#" className="py-4"><CalIcon /></a>
        <a href="#" className="py-4"><AuthButton /></a>
      </nav>
    );
  }