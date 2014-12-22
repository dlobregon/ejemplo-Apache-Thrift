struct Twit {
  1: i32 id,
  2: string usuario,
  3: string casaca
}

service  Publicar{
  void guardar(1: Twit tw)
}
