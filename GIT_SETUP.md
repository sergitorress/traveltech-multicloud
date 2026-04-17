# 📦 Git Setup & GitHub Workflow

Instruccions per configurar GitHub per a aquest projecte.

## 📝 Configuració inicial

### 1. Crear repositori a GitHub

1. Anar a https://github.com/new
2. **Repository name**: `traveltech-multicloud`
3. **Description**: "Multi-cloud travel planning platform with microservices"
4. **Public** (per a mostrar portfolio) o **Private** (per a ús personal)
5. Clic "Create repository"

### 2. Configuració local de Git

```bash
# Primera execució: configurar usuari global (opcional)
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"

# O configuració local del projecte
cd traveltech-multicloud
git config user.name "Tu Nombre"
git config user.email "tu@email.com"
```

### 3. Inicialitzar repositori local

```bash
cd traveltech-multicloud

# Inicialitzar git
git init

# Afegir tots els fitxers
git add .

# Primer commit
git commit -m "Initial commit: TravelTech MultiCloud Platform

- Frontend web amb integració de microserveis
- 3 microserveis: Favorites, Wishlist, Comments
- Arquitectura multi-cloud
- API externa integrada (REST Countries)"

# Canviar nom de branca a main (si necessari)
git branch -M main

# Afegir remote (substituir USERNAME i REPO)
git remote add origin https://github.com/USERNAME/traveltech-multicloud.git

# Push inicial
git push -u origin main
```

---

## 🔄 Workflow de desenvolupament

### Branques recomanades

```
main (o master)
  ├── stable releases
  ├── merged PRs

develop
  ├── integration branch
  ├── versió pre-production

feature/frontend
feature/favorites-service
feature/wishlist-service
feature/comments-service
feature/deployment

bugfix/cors-issue
```

### Crear branca de funcionalitat

```bash
# Descarregar últimes canvis
git pull origin develop

# Crear branca nova
git checkout -b feature/nova-funcionalitat

# Fer canvis...
git add .
git commit -m "Add: descripció dels canvis"
git push origin feature/nova-funcionalitat

# Crear Pull Request a GitHub
```

---

## 📊 Commits recomanats

### Format de missatge de commit

```
tipo(scope): descripció breu

Body amb descripció més detallada (opcional)

Fixes #123  (si tanca un issue)
```

### Tipus

- **feat**: Nova funcionalitat
- **fix**: Correcció de bug
- **docs**: Canvis en documentació
- **style**: Canvis de format (sense lògica)
- **refactor**: Refactor de codi
- **perf**: Millorament de performance
- **test**: Afegir tests
- **chore**: Actualitzacions de dependències

### Exemples

```bash
# Nova funcionalitat
git commit -m "feat(frontend): add country search suggestions"

# Bug fix
git commit -m "fix(cors): enable cross-origin for all services"

# Documentació
git commit -m "docs: add deployment guide for Render"

# Actualització de dependències
git commit -m "chore(deps): update express to 4.18.2"
```

---

## 🚀 Desplegament automàtic

### Render (Frontend)

1. Connectar GitHub a Render
2. **Repository**: `traveltech-multicloud`
3. **Root Directory**: `frontend`
4. Deploy automàtic cada push a `main`

### Railway (Wishlist)

1. Connectar GitHub a Railway
2. Seleccionar servei i **Root Directory**: `service-wishlist`
3. Auto-deploy onpush

### Fly.io (Comments)

```bash
# Primera vegada
flyctl launch

# Subsequent deployments
git push origin main
```

---

## 🔐 GitHub Secrets (si necessari)

Per a deployments automàtics, afegir secrets a GitHub:

1. Settings → Secrets and variables → Actions
2. **New repository secret**

Exemples de secrets útils:
- `RENDER_API_KEY`
- `RAILWAY_API_KEY`
- `FLY_API_TOKEN`
- `VERCEL_TOKEN`

---

## 👥 Pull Requests

### Crear PR

```bash
# Push branca
git push origin feature/my-feature

# A GitHub: New Pull Request
# - Base: main
# - Compare: feature/my-feature
# - Afegir descripció
# - Clic "Create Pull Request"
```

### Plantilla de PR

```markdown
## Descripció
Breument, què fa aquest PR?

## Tipus de canvi
- [ ] Bug fix
- [ ] Nova funcionalitat
- [ ] Breaking change
- [ ] Actualizació de documentació

## Testing
Com testegar els canvis?

## Capturas (opcional)
Afegir screenshots si aplica

## Checklist
- [ ] Testear localment
- [ ] Actualitzar documentació
- [ ] No breaking changes
```

---

## 📈 Estadístiques del repositori

### Ver estadístiques

```bash
# Número de commits
git log --oneline | wc -l

# Commits per autor
git shortlog -sn

# Tamaño del repositori
du -sh .git

# Últims commits
git log --oneline -10
```

---

## 🧹 Manteniment

### Actualitzar dependències

```bash
cd frontend
npm update
npm audit

# Frontend
cd ../service-favorites
npm update
npm audit

# ... repetir per a cada servei
```

### Limpiar brances locals

```bash
# Llistar brances
git branch -a

# Eliminar branca local
git branch -d feature/old-feature

# Eliminar branca remota
git push origin --delete feature/old-feature
```

---

## 🔗 Útils GitHub

- **Issues**: Crear tickets de treball
- **Projects**: Kanban board per a planning
- **Discussions**: For preguntes del comunitat
- **Wiki**: Documentació adicional
- **Releases**: Versionar releases

### Marcar com release

```bash
git tag v1.0.0
git push origin v1.0.0

# A GitHub: Releases → Create Release from tag
```

---

## 🐛 Debugging remot

### Ver commits específics

```bash
git show COMMIT_HASH

git log -p -1 --name-status
```

### Restaurar commit anterior

```bash
# Revert (crear commit nou)
git revert COMMIT_HASH

# Reset (esborrar commits - CUIDADO)
git reset --hard HEAD~1
```

---

## 📚 Recursos

- [GitHub Docs](https://docs.github.com)
- [Git Cheat Sheet](https://training.github.com/downloads/github-git-cheat-sheet.pdf)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Actions](https://docs.github.com/en/actions)

---

**Tip**: Afegir `CODEOWNERS` file per a auto-assign reviewers si és un projecte en equip.
