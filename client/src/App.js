/** @format */

import Calculator from "./components/organisms/Calculator";
import { CalculatorProvider } from "./context/CalculatorContext";

function App() {
	return (
		<>
			<CalculatorProvider>
				<Calculator />
			</CalculatorProvider>
		</>
	);
}

export default App;
