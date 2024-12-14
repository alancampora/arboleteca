export default function Header() {
  return (
    <>
      {
        false &&
        <header className="bg-green-600 text-white text-center py-8">
          <h1 className="text-4xl font-bold">🌳 Arboleteca</h1>
          <p className="text-xl mt-2">Descubre los secretos de los árboles que te rodean</p>
        </header>
      }
      {
        <header className="bg-green-600 text-white text-center p-4 flex flex-row">
          <h1 className="text-2xl font-bold">🌳 Arboloteca</h1>
        </header>

      }
    </>
  )
}
