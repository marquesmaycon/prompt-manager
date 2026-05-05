export default async function Home() {
  return (
    <section className="flex min-h-full">
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading mb-4 text-2xl font-bold">
            Selecione um prompt
          </h1>
          <p className="text-gray-200">
            Escolha um prompt para começar a conversar com o ChatGPT. Você pode
            escolher entre uma variedade de tópicos e estilos de conversa para
            personalizar sua experiência.
          </p>
        </div>
      </div>
    </section>
  )
}
