 # Installation Guide for Quran App

## windows

<details>
<summary>Expand</summary>

Install [rust](https://www.rust-lang.org/tools/install), [node](https://nodejs.org) and [pnpm](https://pnpm.io/)

```cmd
winget install --id OpenJS.NodeJS
winget install --id Rustlang.Rust-msvc
npm install -g pnpm
```
Then Install `Microsoft Visual Studio C++ Build Tools` from [here](https://visualstudio.microsoft.com/visual-cpp-build-tools/)

Then check this box when installing 
 ![GitHub Logo](https://tauri.app/assets/images/vs-installer-dark-03cefd64bd4335f718aacc8f4842d2bb.png)

- Make sure to select `Desktop developement with C++`.
- In the right bar, select `MSVC  - VS  C++ x64/x86 build tools (v14.29)` and `Windows sdk` from the list.
</details>

## Mac 



<details>
<summary>Expand</summary>

Install [rust](https://www.rust-lang.org/tools/install), [node](https://nodejs.org) and [pnpm](https://pnpm.io/)

If you have [homebrew](https://brew.sh/)
```bash
brew install node
brew install rust
npm install -g pnpm
```

 
</details>


## Linux

<details>
	<summary>Debian</summary>
	
Install [rust](https://www.rust-lang.org/tools/install), [node](https://nodejs.org) and [pnpm](https://pnpm.io/)
	
```bash
sudo apt update
sudo apt install libwebkit2gtk-4.0-dev \
    build-essential \
    curl \
    wget \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev 
	
npm install -g pnpm
```
</details>


<details>
	<summary>Archlinux</summary>
	
Install [rust](https://www.rust-lang.org/tools/install), [node](https://nodejs.org) and [pnpm](https://pnpm.io/)
	
```bash
sudo pacman -Syu
sudo pacman -S --needed \
    webkit2gtk \
    base-devel \
    curl \
    wget \
    openssl \
    appmenu-gtk-module \
    gtk3 \
    libappindicator-gtk3 \
    librsvg \
    libvips \
    nodejs \
    npm

npm install -g pnpm
```
</details>



## Proceed to installation 

```bash
git clone https://github.com/spa5k/quran &&
cd quran &&
pnpm install &&
pnpm tauri dev
```
## To run the app

run the whole app

```bash
pnpm tauri dev
```
run frontend only

```bash
pnpm vite dev
```

