#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

SRC_RAW="~"
SRC_RAW="$SRC_RAW/code/firefox/obj-x86_64-unknown-linux-android/gradle/maven"
DEST_RAW="$SCRIPT_DIR/local-maven-repo"

SRC="${SRC_RAW/#\~/$HOME}"
DEST="${DEST_RAW/#\~/$HOME}"

if grep -qiE "microsoft|wsl" /proc/version 2>/dev/null; then
    echo "==> 运行环境: WSL（推荐）"
else
    echo "==> 警告: 当前似乎不是 WSL 环境"
    echo "   $HOME 可能是 Windows 用户目录（如 C:/Users/...），"
    echo "   ~/code/firefox 将不会指向 WSL 里的构建目录。"
    echo "   建议在 WSL 内运行:  bash sync-maven-from-wsl.sh"
fi

echo "==> 源目录: $SRC"
echo "==> 目标目录: $DEST"

if [ ! -d "$SRC" ]; then
    echo "[错误] 源目录不存在: $SRC" >&2
    echo "       请检查 ~ 是否展开正确、以及 firefox 构建目录是否存在。" >&2
    exit 1
fi

if [ ! -d "$DEST" ]; then
    echo "==> 目标目录不存在，自动创建: $DEST"
    mkdir -p "$DEST"
fi

echo "==> 开始复制..."
rsync -a --ignore-existing "$SRC/" "$DEST/"

echo "==> 复制完成，目录结构如下："
find "$DEST" -type d | sort
echo
echo "==> 复制到的 AAR 文件："
find "$DEST" -name "*.aar" -exec ls -lh {} \;

echo "==> 完成 ✅"
